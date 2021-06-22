require "zlib"
require "sinatra"
require "sinatra/activerecord"
require "sinatra/flash"
require "active_support"

require_relative "app/models/player"
require_relative "app/models/sighting"

enable :sessions

# By default, it looks for views in `./views/`
set :views, settings.root + '/app/views'

# By default, it looks for public assets in `./public`
set :public_folder, settings.root + '/app/public'

Time.zone = "UTC"

get "/" do
  display_limit = 50

  @players = Player.all.order(:id)
  @sightings =
    Sighting.
    includes(:player).
    order(created_at: :desc).
    limit(display_limit)

  @scores = Sighting.group(:player_id).count
  @scores_unique = {}
  @sightings_hidden = Sighting.count - display_limit

  # Calculate unique scores
  Sighting.connection.execute(
    <<-SQL
    SELECT player_id, COUNT(DISTINCT state)
    FROM sightings s
    GROUP BY 1
    SQL
  ).to_a.each { |s| @scores_unique[s['player_id']] = s['count'] }

  erb :index
end

post "/sightings" do
  sightings_params = params[:sighting]

  player = Player.find_by_id(sightings_params[:player_id])
  state = sightings_params[:state]

  unless player && state
    flash[:error] = "INVALID REQUEST"
    redirect to("/")
    return
  end

  Sighting.create!(player: player, state: state)
  redirect to("/")
end

get "/sightings/:sighting_id/delete" do
  sighting = Sighting.find_by_id(params[:sighting_id])

  unless sighting
    flash[:error] = "INVALID REQUEST"
    redirect to("/")
    return
  end

  sighting.destroy!
  redirect to("/")
end
