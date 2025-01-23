using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using MedicRecord.Authorization;

namespace MedicRecord;

[DependsOn(
    typeof(MedicRecordCoreModule),
    typeof(AbpAutoMapperModule))]
public class MedicRecordApplicationModule : AbpModule
{
    public override void PreInitialize()
    {
        Configuration.Authorization.Providers.Add<MedicRecordAuthorizationProvider>();
    }

    public override void Initialize()
    {
        var thisAssembly = typeof(MedicRecordApplicationModule).GetAssembly();

        IocManager.RegisterAssemblyByConvention(thisAssembly);

        Configuration.Modules.AbpAutoMapper().Configurators.Add(
            // Scan the assembly for classes which inherit from AutoMapper.Profile
            cfg => cfg.AddMaps(thisAssembly)
        );
    }
}
