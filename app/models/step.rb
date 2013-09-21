class Step < ActiveRecord::Base
	belongs_to :puzzle
	has_many :step_results

	has_and_belongs_to_many :solve_methods
end
