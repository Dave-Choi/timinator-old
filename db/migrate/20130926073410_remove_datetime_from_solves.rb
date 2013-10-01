class RemoveDatetimeFromSolves < ActiveRecord::Migration
  def change
    remove_column :solves, :datetime, :datetime
  end
end
