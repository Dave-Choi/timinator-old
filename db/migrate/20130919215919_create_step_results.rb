class CreateStepResults < ActiveRecord::Migration
  def change
    create_table :step_results do |t|
      t.integer :time

      t.timestamps
    end
  end
end
