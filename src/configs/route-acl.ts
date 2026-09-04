import { ACLObj } from './acl';
import { navigation } from './navigation';

// Auto-generate route ACL map from navigation config
export const routeACLMap: Record<string, ACLObj> = navigation.reduce((acc, item) => {
  if (item.href) {
    acc[item.href] = { action: 'read', subject: item.subject };
  }
  if (item.children) {
    item.children.forEach((child) => {
      acc[child.href] = { action: 'read', subject: item.subject };
    });
  }
  return acc;
}, {} as Record<string, ACLObj>);

export function getACLForRoute(pathname: string): ACLObj | null {
  // Check exact match first
  if (routeACLMap[pathname]) {
    return routeACLMap[pathname];
  }
  
  // Check if pathname starts with any of the routes
  for (const route in routeACLMap) {
    if (pathname.startsWith(route)) {
      return routeACLMap[route];
    }
  }
  
  return null;
}
