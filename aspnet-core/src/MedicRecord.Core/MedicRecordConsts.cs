using MedicRecord.Debugging;

namespace MedicRecord;

public class MedicRecordConsts
{
    public const string LocalizationSourceName = "MedicRecord";

    public const string ConnectionStringName = "Default";

    public const bool MultiTenancyEnabled = true;


    /// <summary>
    /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
    /// </summary>
    public static readonly string DefaultPassPhrase =
        DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "368ea735b7514f1185fb1a8108319d79";
}
