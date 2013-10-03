class AddTotalTimeToSolves < ActiveRecord::Migration
  def change
    add_column :solves, :total_time, :integer
    add_index :solves, :total_time
  end
end
