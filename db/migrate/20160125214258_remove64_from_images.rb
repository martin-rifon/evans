class Remove64FromImages < ActiveRecord::Migration
  def change
    add_column :images, :url, :text 

    remove_column :images, :base64_string
    remove_column :images, :extension
  end
end
