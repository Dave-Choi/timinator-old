Timinator.Method = DS.Model.extend({
	name: DS.attr("string"),
	steps: DS.hasMany("Timinator.Step"),
	puzzle: DS.belongsTo("Timinator.Puzzle")
});

Timinator.Method.FIXTURES = [
	{
		id: 1,
		puzzle: 1,
		name: "No Breakdown",
		steps: [
			9 // Full Solve
		]
	},
	{
		id: 2,
		puzzle: 1,
		name: "CFOP",
		steps: [
			1,	// Cross
			2,	// F2L
			3,	// OLL
			4	// PLL
		]
	},
	{
		id: 3,
		puzzle: 1,
		name: "Roux",
		steps: [
			5, //	F2B-1
			6, //	F2B-2
			7, //	CMLL
			8 //	L6E
		]
	}
];
