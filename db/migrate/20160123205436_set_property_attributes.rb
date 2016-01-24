class SetPropertyAttributes < ActiveRecord::Migration
  def change
    remove_column :properties, :title
    remove_column :properties, :text

  	add_column :properties, :neighborhood, :string
    add_column :properties, :address, :string
    add_column :properties, :description, :string
    add_column :properties, :price_currency, :string
    add_column :properties, :contact_telephone, :string
    add_column :properties, :contact_from_time, :string
    add_column :properties, :contact_to_time, :string
    add_column :properties, :contact_email, :string

    add_column :properties, :tiger_id, :integer
    add_column :properties, :bedroom_amount, :integer
    add_column :properties, :bathroom_amount, :integer
    add_column :properties, :floor, :integer
    add_column :properties, :floor_amount, :integer
    add_column :properties, :contact_from_day, :integer
    add_column :properties, :contact_to_day, :integer

    add_column :properties, :lat, :decimal
    add_column :properties, :lon, :decimal
    add_column :properties, :price, :decimal
    add_column :properties, :m2_built, :decimal
    add_column :properties, :m2_not_built, :decimal

    add_column :properties, :price_includes_shared_expenses, :boolean
    add_column :properties, :has_garage, :boolean
  end
end
