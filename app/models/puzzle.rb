class Puzzle < ActiveRecord::Base
	has_many :solve_methods
	has_many :steps

	has_many :solves, :through => :solve_methods
end
