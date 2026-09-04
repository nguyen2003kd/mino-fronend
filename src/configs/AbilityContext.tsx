import { createContext } from 'react';
import { createMongoAbility } from '@casl/ability';
import type { AppAbility } from './acl';

export const AbilityContext = createContext<AppAbility>(createMongoAbility());
