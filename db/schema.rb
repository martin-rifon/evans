# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160409131349) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "images", force: :cascade do |t|
    t.integer  "property_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.text     "url"
    t.string   "alt_text"
  end

  add_index "images", ["property_id"], name: "index_images_on_property_id", using: :btree

  create_table "properties", force: :cascade do |t|
    t.datetime "created_at",                                           null: false
    t.datetime "updated_at",                                           null: false
    t.string   "neighborhood"
    t.string   "address"
    t.string   "description"
    t.string   "price_currency"
    t.string   "contact_telephone"
    t.string   "contact_from_time"
    t.string   "contact_to_time"
    t.string   "contact_email"
    t.integer  "tiger_id"
    t.integer  "bedroom_amount"
    t.integer  "bathroom_amount"
    t.integer  "floor"
    t.integer  "floor_amount"
    t.integer  "contact_from_day"
    t.integer  "contact_to_day"
    t.decimal  "lat"
    t.decimal  "lon"
    t.decimal  "price"
    t.decimal  "m2_built"
    t.decimal  "m2_not_built"
    t.boolean  "price_includes_shared_expenses"
    t.boolean  "has_garage"
    t.decimal  "shared_expenses"
    t.integer  "contact_info_view_count",        default: 0
    t.boolean  "for_sale",                       default: false
    t.boolean  "for_rent",                       default: true
    t.string   "property_type",                  default: "apartment"
  end

end
