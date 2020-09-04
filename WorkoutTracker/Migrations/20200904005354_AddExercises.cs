using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WorkoutTracker.Migrations
{
    public partial class AddExercises : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ExerciseId",
                table: "SetPlans",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Exercises",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exercises", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SetPlans_ExerciseId",
                table: "SetPlans",
                column: "ExerciseId");

            migrationBuilder.AddForeignKey(
                name: "FK_SetPlans_Exercises_ExerciseId",
                table: "SetPlans",
                column: "ExerciseId",
                principalTable: "Exercises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SetPlans_Exercises_ExerciseId",
                table: "SetPlans");

            migrationBuilder.DropTable(
                name: "Exercises");

            migrationBuilder.DropIndex(
                name: "IX_SetPlans_ExerciseId",
                table: "SetPlans");

            migrationBuilder.DropColumn(
                name: "ExerciseId",
                table: "SetPlans");
        }
    }
}
