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

const roleHierarchy: { [key: number]: Role[] } = {
  1: [Role.PRESIDENT],
  2: [Role.VICE_PRESIDENT],
  3: [Role.TREASURY_HEAD, Role.PUBLIC_RELATIONS_HEAD, Role.PLANNING_HEAD],
  4: [Role.TREASURY_ASSISTANT, Role.PUBLIC_RELATIONS_ASSISTANT, Role.PLANNING_ASSISTANT],
  5: [Role.MEMBER],
};

const findRoleIndex = (role: Role): number => {
  for (const key in roleHierarchy) {
    if (roleHierarchy[key].includes(role)) {
      return parseInt(key);
    }
  }
  return -1;
};

export const canChangeRole = (myRole: Role, targetRole: Role): boolean => {
  const myRoleIndex = findRoleIndex(myRole);
  const targetRoleIndex = findRoleIndex(targetRole);

  return myRoleIndex < targetRoleIndex;
};
