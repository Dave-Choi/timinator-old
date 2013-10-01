# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

standard_cube = Puzzle.create(name: '3x3x3', slug: '3x3x3')

cfop_steps = Step.create([
	{name: "Cross", description: "Orient and permute the edges on one face.", puzzle: standard_cube},
	{name: "F2L", description: "Insert corner/edge pairs with a completed cross to complete the first two layers.", puzzle: standard_cube},
	{name: "OLL", description: "Orient last layer pieces to make a solid colored face.", puzzle: standard_cube},
	{name: "PLL", description: "Permute last layer pieces after orientation to solve the layer.", puzzle: standard_cube}
])
roux_steps = Step.create([
	{name: "F2B-1", description: "Solve a 1x2x3 block on one side.", puzzle: standard_cube},
	{name: "F2B-2", description: "Solve a 1x2x3 block opposite the first 1x2x3 block.", puzzle: standard_cube},
	{name: "CMLL", description: "Solve last layer corners without regard to the M slice.", puzzle: standard_cube},
	{name: "L6E", description: "Solve last layer and DF and DB edges.", puzzle: standard_cube}
])

full_steps = Step.create({name: "Full Solve", description: "Freestyle start to finish.", puzzle: standard_cube})

SolveMethod.create(name: "No Breakdown", steps: [full_steps], puzzle: standard_cube)
SolveMethod.create(name: "CFOP", steps: cfop_steps, puzzle: standard_cube)
SolveMethod.create(name: "Roux", steps: roux_steps, puzzle: standard_cube)
