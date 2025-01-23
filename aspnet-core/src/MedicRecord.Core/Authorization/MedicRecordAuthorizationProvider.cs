using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace MedicRecord.Authorization;

public class MedicRecordAuthorizationProvider : AuthorizationProvider
{
    public override void SetPermissions(IPermissionDefinitionContext context)
    {
        context.CreatePermission(PermissionNames.Pages_Users, L("Users"));
        context.CreatePermission(PermissionNames.Pages_Users_Activation, L("UsersActivation"));
        context.CreatePermission(PermissionNames.Pages_Roles, L("Roles"));
        context.CreatePermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);

        context.CreatePermission(PermissionNames.Pages_System, L("System"));
        context.CreatePermission(PermissionNames.Pages_Maintenances, L("Maintenances"));


        context.CreatePermission(PermissionNames.Pages_MedicalCenters, L("MedicalCenters"));
        context.CreatePermission(PermissionNames.Pages_MedicalCenters_GetAll, L("MedicalCentersGetAll"));
        context.CreatePermission(PermissionNames.Pages_MedicalCenters_Create, L("MedicalCentersCreate"));
        context.CreatePermission(PermissionNames.Pages_MedicalCenters_Update, L("MedicalCentersUpdate"));
        context.CreatePermission(PermissionNames.Pages_MedicalCenters_Delete, L("MedicalCentersDelete"));

        context.CreatePermission(PermissionNames.Pages_Symptoms, L("Symptoms"));
        context.CreatePermission(PermissionNames.Pages_Symptoms_GetAll, L("SymptomsGetAll"));
        context.CreatePermission(PermissionNames.Pages_Symptoms_Create, L("SymptomsCreate"));
        context.CreatePermission(PermissionNames.Pages_Symptoms_Update, L("SymptomsUpdate"));
        context.CreatePermission(PermissionNames.Pages_Symptoms_Delete, L("SymptomsDelete"));

        context.CreatePermission(PermissionNames.Pages_ConfigurationParameters, L("ConfigurationParameters"));

        context.CreatePermission(PermissionNames.Pages_Diseases, L("Diseases"));
        context.CreatePermission(PermissionNames.Pages_Diseases_GetAll, L("DiseasesGetAll"));
        context.CreatePermission(PermissionNames.Pages_Diseases_Create, L("DiseasesCreate"));
        context.CreatePermission(PermissionNames.Pages_Diseases_Update, L("DiseasesUpdate"));
        context.CreatePermission(PermissionNames.Pages_Diseases_Delete, L("DiseasesDelete"));
    }

    private static ILocalizableString L(string name)
    {
        return new LocalizableString(name, MedicRecordConsts.LocalizationSourceName);
    }
}
