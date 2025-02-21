using Abp.Application.Services.Dto;
using Abp.Runtime.Validation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicRecord.Services.Patient.Dto
{
    public class PagedPatientResultPatientDto : PagedResultRequestDto, IShouldNormalize
    {
        public string Keyword { get; set; }
        public string Sorting { get; set; }
        public bool IsActive { get; set; }

        public void Normalize()
        {
            Keyword = Keyword?.Trim();
        }
    }
}
