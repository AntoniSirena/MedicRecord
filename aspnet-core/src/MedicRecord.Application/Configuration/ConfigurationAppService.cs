using Abp.Authorization;
using Abp.Runtime.Session;
using MedicRecord.Configuration.Dto;
using System.Threading.Tasks;

namespace MedicRecord.Configuration;

[AbpAuthorize]
public class ConfigurationAppService : MedicRecordAppServiceBase, IConfigurationAppService
{
    public async Task ChangeUiTheme(ChangeUiThemeInput input)
    {
        await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
    }
}
