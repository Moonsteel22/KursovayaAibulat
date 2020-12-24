import asyncio,json
from django.contrib.auth import get_user_model
from channels.consumer import AsyncConsumer
from channels.db import database_sync_to_async

class TransactionsConsumer(AsyncConsumer):
    async def websocket_connect(self,event):
        print("ConnectedHeh",event)

    async def websocket_received(self,event):
        print("ReceivedHeh",event)

    async def websocket_disconnect(self,event):
        print("DisconnectHeh",event)

    async def websocket_closed(self,event):
        print("ClosedHeh",event)