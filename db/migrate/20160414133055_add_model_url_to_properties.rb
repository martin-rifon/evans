class AddModelUrlToProperties < ActiveRecord::Migration
  def change
  	add_column :properties, :model_URL, :string
  end
end
