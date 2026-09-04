'use client';

import { useContext, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AbilityContext } from '@/configs/AbilityContext';
import { getACLForRoute } from '@/configs/route-acl';

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const ability = useContext(AbilityContext);
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = pathname ?? '/';

  const acl = getACLForRoute(currentPath);

  useEffect(() => {
    if (!ability || !acl) return;
    
    if (!ability.can(acl.action, acl.subject)) {
      router.replace('/403');
    }
  }, [ability, acl, router]);

  // If this route requires ACL check
  if (acl) {
    if (!ability) return null;
    if (!ability.can(acl.action, acl.subject)) return null;
  }

  return <>{children}</>;
}
