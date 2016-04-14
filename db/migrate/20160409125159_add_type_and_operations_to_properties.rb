class AddTypeAndOperationsToProperties < ActiveRecord::Migration
  def change
  	add_column :properties, :for_sale, :boolean, :default => false
  	add_column :properties, :for_rent, :boolean, :default => true
  	add_column :properties, :type, :string, :default => 'apartment'
  end
end
