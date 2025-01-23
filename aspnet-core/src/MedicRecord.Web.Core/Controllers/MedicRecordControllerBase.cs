using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace MedicRecord.Controllers
{
    public abstract class MedicRecordControllerBase : AbpController
    {
        protected MedicRecordControllerBase()
        {
            LocalizationSourceName = MedicRecordConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
