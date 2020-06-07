from rest_framework import routers
from .api import CartViewSet

router = routers.DefaultRouter()
router.register('api/carts',CartViewSet,'carts')

urlpatterns = router.urls