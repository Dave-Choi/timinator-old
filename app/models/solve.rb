class Solve < ActiveRecord::Base
	has_many :step_results

	belongs_to :solve_method
	belongs_to :user

end
