using Abp.Events.Bus;
using Abp.Modules;
using Abp.Reflection.Extensions;
using MedicRecord.Configuration;
using MedicRecord.EntityFrameworkCore;
using MedicRecord.Migrator.DependencyInjection;
using Castle.MicroKernel.Registration;
using Microsoft.Extensions.Configuration;

namespace MedicRecord.Migrator;

[DependsOn(typeof(MedicRecordEntityFrameworkModule))]
public class MedicRecordMigratorModule : AbpModule
{
    private readonly IConfigurationRoot _appConfiguration;

    public MedicRecordMigratorModule(MedicRecordEntityFrameworkModule abpProjectNameEntityFrameworkModule)
    {
        abpProjectNameEntityFrameworkModule.SkipDbSeed = true;

        _appConfiguration = AppConfigurations.Get(
            typeof(MedicRecordMigratorModule).GetAssembly().GetDirectoryPathOrNull()
        );
    }

    public override void PreInitialize()
    {
        Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(
            MedicRecordConsts.ConnectionStringName
        );

        Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
        Configuration.ReplaceService(
            typeof(IEventBus),
            () => IocManager.IocContainer.Register(
                Component.For<IEventBus>().Instance(NullEventBus.Instance)
            )
        );
    }

    public override void Initialize()
    {
        IocManager.RegisterAssemblyByConvention(typeof(MedicRecordMigratorModule).GetAssembly());
        ServiceCollectionRegistrar.Register(IocManager);
    }
}
