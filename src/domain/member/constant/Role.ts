export enum Role {
  PRESIDENT = 'PRESIDENT',
  VICE_PRESIDENT = 'VICE_PRESIDENT',
  TREASURY_HEAD = 'TREASURY_HEAD',
  TREASURY_ASSISTANT = 'TREASURY_ASSISTANT',
  PUBLIC_RELATIONS_HEAD = 'PUBLIC_RELATIONS_HEAD',
  PUBLIC_RELATIONS_ASSISTANT = 'PUBLIC_RELATIONS_ASSISTANT',
  PLANNING_HEAD = 'PLANNING_HEAD',
  PLANNING_ASSISTANT = 'PLANNING_ASSISTANT',
  MEMBER = 'MEMBER',
}

const roleHierarchy: { [key: string]: number } = {
  [Role.PRESIDENT]: 1,

  [Role.VICE_PRESIDENT]: 2,

  [Role.TREASURY_HEAD]: 3,
  [Role.PUBLIC_RELATIONS_HEAD]: 3,
  [Role.PLANNING_HEAD]: 3,

  [Role.TREASURY_ASSISTANT]: 4,
  [Role.PUBLIC_RELATIONS_ASSISTANT]: 4,
  [Role.PLANNING_ASSISTANT]: 4,

  [Role.MEMBER]: 5,
};

export const canChangeRole = (myRole: Role, targetRole: Role): boolean => {
  const myRoleIndex = roleHierarchy[myRole];
  const targetRoleIndex = roleHierarchy[targetRole];

  return myRoleIndex < targetRoleIndex;
};
