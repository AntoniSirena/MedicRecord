using Abp.Authorization;
using MedicRecord.Authorization.Roles;
using MedicRecord.Authorization.Users;

namespace MedicRecord.Authorization;

public class PermissionChecker : PermissionChecker<Role, User>
{
    public PermissionChecker(UserManager userManager)
        : base(userManager)
    {
    }
}
