class SolveMethod < ActiveRecord::Base
	has_and_belongs_to_many :steps
	belongs_to :puzzle

	has_many :solves
end
