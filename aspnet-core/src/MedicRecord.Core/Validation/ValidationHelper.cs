using Abp.Extensions;
using System.Text.RegularExpressions;

namespace MedicRecord.Validation;

public static class ValidationHelper
{
    public const string EmailRegex = @"^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$";

    public static bool IsEmail(string value)
    {
        if (value.IsNullOrEmpty())
        {
            return false;
        }

        var regex = new Regex(EmailRegex);
        return regex.IsMatch(value);
    }
}
