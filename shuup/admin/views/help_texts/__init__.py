# -*- coding: utf-8 -*-
# This file is part of Shuup.
#
# Copyright (c) 2012-2019, Shoop Commerce Ltd. All rights reserved.
#
# This source code is licensed under the OSL-3.0 license found in the
# LICENSE file in the root directory of this source tree.

from django.http import JsonResponse
from .help_texts.some_help import test_object

key_value_map = {
    "payment_method": payment_method
    "products": products
    "service_provider": service_provider
}

def get_help_json(request, key):
    return JsonResponse(key_value_map.get(key, {}))
