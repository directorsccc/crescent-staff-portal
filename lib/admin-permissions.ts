
const normaliseEmail = (email?: string | null) =>
  (email || "").trim().toLowerCase();

export function isMainAdmin(email?: string | null) {
  const mainAdmin = normaliseEmail(process.env.ADMIN_EMAIL);

  return (
    mainAdmin.length > 0 &&
    normaliseEmail(email) === mainAdmin
  );
}

export function isStaffManager(email?: string | null) {
  const managers = [
    process.env.staff_manager_email,
    process.env.staff_manager_email_1,
    process.env.staff_manager_email_2,
  ]
    .map(normaliseEmail)
    .filter(Boolean);

  const userEmail = normaliseEmail(email);

  return userEmail.length > 0 && managers.includes(userEmail);
}

export function canManageStaff(email?: string | null) {
  return isMainAdmin(email) || isStaffManager(email);
}

export function isProtectedAdmin(email?: string | null) {
  return isMainAdmin(email) || isStaffManager(email);
}
