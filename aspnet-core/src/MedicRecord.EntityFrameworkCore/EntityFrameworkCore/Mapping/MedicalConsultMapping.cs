using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MedicRecord.Domain;

namespace MedicRecord.EntityFrameworkCore.Mapping
{
    public class MedicalConsultMapping : IEntityTypeConfiguration<Domain.MedicalConsult>
    {
        public void Configure(EntityTypeBuilder<MedicalConsult> builder)
        {

        }
    }
}
