import { AbilityBuilder, createMongoAbility, MongoAbility } from '@casl/ability';

export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';
export type Subjects = 'InternNavigation' | 'SchoolNavigation' | 'KidNavigation' | 'all';

export type AppAbility = MongoAbility<[Actions, Subjects]>;

export interface ACLObj {
  action: Actions;
  subject: Subjects;
}

export const defineRulesFor = (roleCode: string | null) => {
  const { can, rules } = new AbilityBuilder<AppAbility>(createMongoAbility);

  if (roleCode === 'INTERN' || roleCode === 'STUDENT') {
    can('read', 'InternNavigation');
  } else if (roleCode === 'SCHOOL') {
    can('read', 'SchoolNavigation');
  } else if (roleCode === 'KID') {
    can('read', 'KidNavigation');
  } else if (roleCode === 'ADMIN') {
    can('manage', 'all');
  }

  return rules;
};

export const buildAbilityFor = (roleCode: string | null): AppAbility => {
  return createMongoAbility(defineRulesFor(roleCode));
};

