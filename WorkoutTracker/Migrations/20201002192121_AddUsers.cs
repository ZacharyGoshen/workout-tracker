using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WorkoutTracker.Migrations
{
    public partial class AddUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "WorkoutSessions",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "WorkoutPlans",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "SetResults",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "SetPlans",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Exercises",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserName = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WorkoutSessions_UserId",
                table: "WorkoutSessions",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkoutPlans_UserId",
                table: "WorkoutPlans",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SetResults_UserId",
                table: "SetResults",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SetPlans_UserId",
                table: "SetPlans",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Exercises_UserId",
                table: "Exercises",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_User_UserId",
                table: "Exercises",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SetPlans_User_UserId",
                table: "SetPlans",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SetResults_User_UserId",
                table: "SetResults",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutPlans_User_UserId",
                table: "WorkoutPlans",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutSessions_User_UserId",
                table: "WorkoutSessions",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_User_UserId",
                table: "Exercises");

            migrationBuilder.DropForeignKey(
                name: "FK_SetPlans_User_UserId",
                table: "SetPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_SetResults_User_UserId",
                table: "SetResults");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutPlans_User_UserId",
                table: "WorkoutPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutSessions_User_UserId",
                table: "WorkoutSessions");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropIndex(
                name: "IX_WorkoutSessions_UserId",
                table: "WorkoutSessions");

            migrationBuilder.DropIndex(
                name: "IX_WorkoutPlans_UserId",
                table: "WorkoutPlans");

            migrationBuilder.DropIndex(
                name: "IX_SetResults_UserId",
                table: "SetResults");

            migrationBuilder.DropIndex(
                name: "IX_SetPlans_UserId",
                table: "SetPlans");

            migrationBuilder.DropIndex(
                name: "IX_Exercises_UserId",
                table: "Exercises");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "WorkoutSessions");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "WorkoutPlans");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "SetResults");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "SetPlans");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Exercises");
        }
    }
}
