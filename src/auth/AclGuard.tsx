'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AbilityContext } from '@/configs/AbilityContext';
import type { ACLObj } from '@/configs/acl';

export default function ACLGuard({
  children,
  acl,
}: {
  children: React.ReactNode;
  acl: ACLObj;
}) {
  const ability = useContext(AbilityContext);
  const router = useRouter();

  useEffect(() => {
    if (!ability) return;
    if (!ability.can(acl.action, acl.subject)) {
      router.replace('/403');
    }
  }, [ability, acl.action, acl.subject, router]);

  if (!ability) return null;
  if (!ability.can(acl.action, acl.subject)) return null;

  return <>{children}</>;
}
