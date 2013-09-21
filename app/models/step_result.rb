class StepResult < ActiveRecord::Base
	belongs_to :solve
	belongs_to :step
	
end
