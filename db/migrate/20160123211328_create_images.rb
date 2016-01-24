class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.text :base64_string
      t.integer  :property_id

      t.timestamps null: false
    end

    add_index :images, :property_id
  end
end
