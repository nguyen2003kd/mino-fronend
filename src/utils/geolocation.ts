/**
 * Geolocation Utility Functions
 * Handles user location detection and distance calculations
 */

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface GeolocationResult {
  success: boolean;
  coordinates?: Coordinates;
  accuracy?: number;
  error?: string;
}

interface GeolocationOptions {
  desiredAccuracy?: number;
  maxWait?: number;
  timeout?: number;
  maximumAge?: number;
  enableHighAccuracy?: boolean;
}

/**
 * Get user's current location using browser Geolocation API
 * @returns Promise with coordinates or error
 */
export const getCurrentLocation = (
  options: GeolocationOptions = {}
): Promise<GeolocationResult> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({
        success: false,
        error: "Trình duyệt không hỗ trợ định vị",
      });
      return;
    }

    const desiredAccuracy = options.desiredAccuracy ?? 50;
    const maxWait = options.maxWait ?? 12000;
    const timeout = options.timeout ?? 10000;
    const maximumAge = options.maximumAge ?? 0;
    const enableHighAccuracy = options.enableHighAccuracy ?? true;

    let resolved = false;
    let bestPosition: GeolocationPosition | null = null;
    let lastError: GeolocationPositionError | null = null;

    const finishWithPosition = (position: GeolocationPosition) => {
      if (resolved) return;
      resolved = true;
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
      clearTimeout(maxTimer);
      resolve({
        success: true,
        coordinates: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        accuracy: position.coords.accuracy,
      });
    };

    const finishWithError = (error?: GeolocationPositionError | null) => {
      if (resolved) return;
      resolved = true;
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
      clearTimeout(maxTimer);

      let errorMessage = "Không thể lấy vị trí";
      if (error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Bạn đã từ chối quyền truy cập vị trí";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Thông tin vị trí không khả dụng";
            break;
          case error.TIMEOUT:
            errorMessage = "Hết thời gian lấy vị trí";
            break;
        }
      }

      resolve({
        success: false,
        error: errorMessage,
      });
    };

    const handlePosition = (position: GeolocationPosition) => {
      if (!bestPosition || position.coords.accuracy < bestPosition.coords.accuracy) {
        bestPosition = position;
      }

      if (position.coords.accuracy <= desiredAccuracy) {
        finishWithPosition(position);
      }
    };

    const handleError = (error: GeolocationPositionError) => {
      lastError = error;
    };

    const watchId = navigator.geolocation.watchPosition(handlePosition, handleError, {
      enableHighAccuracy,
      timeout,
      maximumAge,
    });

    const maxTimer = setTimeout(() => {
      if (bestPosition) {
        finishWithPosition(bestPosition);
      } else {
        finishWithError(lastError);
      }
    }, maxWait);
  });
};

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param coord1 First coordinate
 * @param coord2 Second coordinate
 * @returns Distance in meters
 */
export const calculateDistance = (
  coord1: Coordinates,
  coord2: Coordinates
): number => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (coord1.lat * Math.PI) / 180;
  const φ2 = (coord2.lat * Math.PI) / 180;
  const Δφ = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const Δλ = ((coord2.lng - coord1.lng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return Math.round(distance); // Return distance in meters (rounded)
};

/**
 * Check if user is within allowed radius
 * @param userCoords User's current coordinates
 * @param checkpointCoords Checkpoint coordinates
 * @param allowedRadius Allowed radius in meters
 * @returns true if within radius, false otherwise
 */
export const isWithinRadius = (
  userCoords: Coordinates,
  checkpointCoords: Coordinates,
  allowedRadius: number
): boolean => {
  const distance = calculateDistance(userCoords, checkpointCoords);
  return distance <= allowedRadius;
};

/**
 * Format distance for display
 * @param meters Distance in meters
 * @returns Formatted string
 */
export const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${meters}m`;
  }
  return `${(meters / 1000).toFixed(2)}km`;
};
