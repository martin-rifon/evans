class CreateProperties < ActiveRecord::Migration
  def change
    create_table :properties do |t|
      t.string :title
      t.text :text

      t.timestamps null: false
    end
  end
end
