class Puzzle < ActiveRecord::Base
	has_many :methods

	has_many :solves, through :methods
end
