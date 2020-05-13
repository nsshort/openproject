#web: ./packaging/scripts/web
#worker: bundle exec rake jobs:work
#backup: ./packaging/scripts/backup
#check: ./packaging/scripts/check
web: bundle exec unicorn -p $PORT -c ./config/unicorn.rb
worker: bundle exec rake jobs:work
backup: ./packaging/scripts/backup
check: ./packaging/scripts/check
