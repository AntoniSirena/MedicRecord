using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using MedicRecord.EntityFrameworkCore;
using MedicRecord.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace MedicRecord.Web.Tests;

[DependsOn(
    typeof(MedicRecordWebMvcModule),
    typeof(AbpAspNetCoreTestBaseModule)
)]
public class MedicRecordWebTestModule : AbpModule
{
    public MedicRecordWebTestModule(MedicRecordEntityFrameworkModule abpProjectNameEntityFrameworkModule)
    {
        abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
    }

    public override void PreInitialize()
    {
        Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
    }

    public override void Initialize()
    {
        IocManager.RegisterAssemblyByConvention(typeof(MedicRecordWebTestModule).GetAssembly());
    }

    public override void PostInitialize()
    {
        IocManager.Resolve<ApplicationPartManager>()
            .AddApplicationPartsIfNotAddedBefore(typeof(MedicRecordWebMvcModule).Assembly);
    }
}