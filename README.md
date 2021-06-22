Keeps score in the License Plate Game. Built with Sinatra and Postgres.

### Build
```bash
bundle install
bundle exec rake db:create
bundle exec rake db:migrate
```

### Setup

```bash
bundle exec rake console
```

Create some players

```ruby
Player.create!(name: 'Ramanujan')
```

### Run

```bash
bundle exec rackup config.ru
```

Visit http://localhost:9292/
