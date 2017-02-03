from pytrends.request import TrendReq

config = {}
execfile("config.py", config)
pytrend = TrendReq(config["google_username"], config["google_password"], custom_useragent='My Pytrends Script')
pytrend.build_payload(kw_list=['macron', 'melenchon'])
interest_over_time_df = pytrend.interest_over_time()
