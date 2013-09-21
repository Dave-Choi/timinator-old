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

ActiveRecord::Schema.define(version: 20130921060422) do

  create_table "puzzles", force: true do |t|
    t.string   "name"
    t.string   "slug"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "solve_methods", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "puzzle_id"
  end

  add_index "solve_methods", ["puzzle_id"], name: "index_solve_methods_on_puzzle_id"

  create_table "solve_methods_steps", id: false, force: true do |t|
    t.integer "solve_method_id", null: false
    t.integer "step_id",         null: false
  end

  create_table "solves", force: true do |t|
    t.datetime "datetime"
    t.string   "scramble"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.integer  "solve_method_id"
  end

  add_index "solves", ["solve_method_id"], name: "index_solves_on_solve_method_id"
  add_index "solves", ["user_id"], name: "index_solves_on_user_id"

  create_table "step_results", force: true do |t|
    t.integer  "time"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "solve_id"
    t.integer  "step_id"
  end

  add_index "step_results", ["solve_id"], name: "index_step_results_on_solve_id"
  add_index "step_results", ["step_id"], name: "index_step_results_on_step_id"

  create_table "steps", force: true do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "puzzle_id"
  end

  add_index "steps", ["puzzle_id"], name: "index_steps_on_puzzle_id"

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true

end
