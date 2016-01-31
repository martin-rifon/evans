class AddSharedExpensesToProperties < ActiveRecord::Migration
  def change
  	add_column :properties, :shared_expenses, :decimal
  end
end
