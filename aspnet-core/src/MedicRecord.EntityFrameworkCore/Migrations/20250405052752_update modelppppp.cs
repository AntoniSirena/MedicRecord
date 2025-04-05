using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MedicRecord.Migrations
{
    /// <inheritdoc />
    public partial class updatemodelppppp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Diseases",
                table: "MedicalConsults");

            migrationBuilder.DropColumn(
                name: "Symptoms",
                table: "MedicalConsults");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Diseases",
                table: "MedicalConsults",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Symptoms",
                table: "MedicalConsults",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
