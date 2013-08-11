Timinator.Puzzle = DS.Model.extend({
	name: DS.attr("string"),
	slug: DS.attr("string"),

	methods: DS.hasMany("Timinator.Method"),
});


Timinator.Puzzle.FIXTURES = [
	{
		id: 1,
		name: "3x3x3",
		slug: "3x3x3",
		methods: [1, 2, 3]
	}
];

