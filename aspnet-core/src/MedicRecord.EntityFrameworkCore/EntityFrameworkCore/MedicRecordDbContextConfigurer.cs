using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace MedicRecord.EntityFrameworkCore;

public static class MedicRecordDbContextConfigurer
{
    public static void Configure(DbContextOptionsBuilder<MedicRecordDbContext> builder, string connectionString)
    {
        builder.UseSqlServer(connectionString);
    }

    public static void Configure(DbContextOptionsBuilder<MedicRecordDbContext> builder, DbConnection connection)
    {
        builder.UseSqlServer(connection);
    }
}
