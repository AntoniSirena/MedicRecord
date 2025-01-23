using System.ComponentModel.DataAnnotations;

namespace MedicRecord.Users.Dto;

public class ChangeUserLanguageDto
{
    [Required]
    public string LanguageName { get; set; }
}