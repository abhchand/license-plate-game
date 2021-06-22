require "sinatra/activerecord/rake"
require "pry"

namespace :db do
  task :load_config do
    require "./app"
  end
end

task :console do
  require "./app"
  Pry.start
end
